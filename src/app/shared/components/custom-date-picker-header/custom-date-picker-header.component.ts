import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, HostBinding,
  Inject,
  OnDestroy, OnInit
} from '@angular/core';
import {MatCalendar, MatDateRangePicker} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from '@angular/material/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DateTime} from 'luxon'

const customPresets = [
  'this month',
  'last quarter',
  'current quarter',
  'this year',
  'last year',
] as const; // convert to readonly tuple of string literals
// equivalent to "today" | "last 7 days" | ... | "last year"
type CustomPreset = typeof customPresets[number];

@Component({
  selector: 'app-custom-date-picker-header',
  templateUrl: './custom-date-picker-header.component.html',
  styleUrls: ['./custom-date-picker-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDatePickerHeaderComponent<D> implements OnInit, OnDestroy {
  // list of range presets we want to provide:
  readonly customPresets = customPresets;
  @HostBinding('class.touch-ui')
  readonly isTouchUi = this.picker.touchUi;

  constructor(
      private _calendar: MatCalendar<D>, private _dateAdapter: DateAdapter<D>,
      private picker: MatDateRangePicker<D>,
      private dateAdapter: DateAdapter<D>,
      @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats, cdr: ChangeDetectorRef) {
    _calendar.stateChanges
        .pipe(takeUntil(this._destroyed))
        .subscribe(() => cdr.markForCheck());
  }
  ngOnInit(): void {

  }


  private _destroyed = new Subject<void>();



  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter
        .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
        .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate = mode === 'month' ?
        this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1) :
        this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate = mode === 'month' ?
        this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1) :
        this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }

  // called when user selects a range preset:
  selectRange(rangeName: CustomPreset): void {
    const [start, end] = this.calculateDateRange(rangeName);
    this.picker.select(start);
    this.picker.select(end);
    this.picker.close();
  }

  private calculateDateRange(rangeName: CustomPreset): [start: D, end: D] {
    const today = this.today;
    const year = this.dateAdapter.getYear(today);

    switch (rangeName) {
      case 'this month': {
        return this.calculateMonth(today);
      }
      case 'this year': {
        const start = this.dateAdapter.createDate(year, 0, 1);
        const endDate = DateTime.now()
        const end = this.dateAdapter.createDate(endDate.year, endDate.month - 1, endDate.day);
        return [start, end];
      }
      case 'last quarter': {
        return this.calculateLastQuarter('Previous');
      }
      case 'current quarter': {
        return this.calculateLastQuarter();
      }
      case 'last year': {
        const start = this.dateAdapter.createDate(year - 1, 0, 1);
        const end = this.dateAdapter.createDate(year - 1, 11, 31);
        return [start, end];
      }
      default:
        // exhaustiveness check;
        // rangeName has type never, if every possible value is handled in the switch cases.
        // Otherwise, the following line will result in compiler error:
        // "Type 'string' is not assignable to type '[start: D, end: D]'"
        return rangeName;
    }
  }

  private calculateMonth(forDay: D): [start: D, end: D] {
    const startOfMonth = DateTime.now().startOf('month');
    const today = DateTime.now();
    const start = this.dateAdapter.createDate(startOfMonth.year, startOfMonth.month - 1, startOfMonth.day);
    const end = this.dateAdapter.createDate(today.year, today.month - 1, today.day);;
    return [start, end];
  }

  private calculateLastQuarter(period: 'Current'|'Previous' = 'Current'): [start: D, end: D] {
    const quarterStart = (period === 'Previous') ? DateTime.now().minus({quarter: 1}).startOf('quarter') : DateTime.now().startOf('quarter');
    let quarterEnd = (period === 'Previous') ? DateTime.now().minus({quarter: 1}).endOf('quarter') : DateTime.now().endOf('quarter');
    const today = DateTime.now();


    if (quarterEnd > today) {
      quarterEnd = today;

    }

    const end = this.dateAdapter.createDate(quarterEnd.year, quarterEnd.month -1, quarterEnd.day);
    const start = this.dateAdapter.createDate(quarterStart.year, quarterStart.month - 1, quarterStart.day);

    return [start, end];
  }

  private calculateWeek(forDay: D): [start: D, end: D] {
    const deltaStart =
        this.dateAdapter.getFirstDayOfWeek() -
        this.dateAdapter.getDayOfWeek(forDay);
    const start = this.dateAdapter.addCalendarDays(forDay, deltaStart);
    const end = this.dateAdapter.addCalendarDays(start, 6);
    return [start, end];
  }

  private get today(): D {
    const today = this.dateAdapter.getValidDateOrNull(new Date());
    if (today === null) {
      throw new Error('date creation failed');
    }
    return today;
  }
}
