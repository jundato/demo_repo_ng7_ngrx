import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from "@angular/core";
import { interval, Subject } from "rxjs";
import { map, takeUntil, tap } from "rxjs/operators";
import * as moment from "moment";
import { AppState } from "@app/store/states";
import { Store } from "@ngrx/store";
import { timerEndSelector } from "../store/selectors";
import * as actions from "../store/actions";

export interface CountDown {
  hours: number;
  minutes: number;
  seconds: number;
  timeLeftValue: number;
  color: string;
}

@Component({
  selector: "exam-countdown",
  templateUrl: "./timer-countdown.component.html",
  styleUrls: ["./timer-countdown.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class TimerCountdownComponent implements OnInit, OnDestroy {
  @Input()
  timeLimit: number = 0;

  @Input()
  sectionOrderNo: number = 0;

  @Input()
  hasStarted: boolean;

  countdown: CountDown;
  endTimeInSeconds: number = 0;

  private onDestroy$ = new Subject<void>();
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   */
  constructor(private store: Store<AppState>) {
    // Set the defaults
    this.countdown = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      timeLeftValue: 0,
      color: "accent"
    };

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.store
      .select(timerEndSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(startTimer => {
          console.log("----");
          if (startTimer > 0) {
            this.beginTimer(startTimer);
          }
        })
      )
      .subscribe();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {}

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  beginTimer(timerEnd: number) {
    const currentTime = moment();
    const endTime = moment(timerEnd);

    // Get the difference in between the current date and event date in seconds
    let diff = endTime.diff(currentTime, "seconds");
    this.endTimeInSeconds = diff;
    // Calculate the remaining time for the first time so there will be no
    // delay on the countdown
    this.countdown = this._secondsToRemaining(diff);

    // Create a subscribable interval
    const countDown = interval(1000).pipe(
      map(value => {
        return (diff = diff - 1);
      }),
      map(value => {
        return this._secondsToRemaining(value);
      })
    );

    // Subscribe to the countdown interval
    let subscription = countDown
      .pipe(
        takeUntil(this._unsubscribeAll),
        tap(value => {
          if (value.timeLeftValue >= 0) {
            this.countdown = value;
          } else {
            subscription.unsubscribe();
            this.store.dispatch(new actions.TimeIsUp());
          }
        })
      )
      .subscribe();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Converts given seconds to a remaining time
   *
   * @param seconds
   * @private
   */
  private _secondsToRemaining(seconds): CountDown {
    const timeLeft = moment.duration(seconds, "seconds");
    const timeLeftValue = (timeLeft.asSeconds() / this.endTimeInSeconds) * 100;

    return {
      hours: timeLeft.hours(),
      minutes: timeLeft.minutes(),
      seconds: timeLeft.seconds(),
      timeLeftValue: timeLeftValue,
      color: timeLeftValue > 10 ? "primary" : "warn"
    };
  }
}
