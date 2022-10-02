const NUM_DAYS = 5;

export const computeNewConflictingCourses = (newCourse, allCourses, selectedCourses, conflictingCourses) => {
  const newConflictingCourses = [];

  for (let i = 0; i < allCourses.length; i++) {
    const course = allCourses[i][1];

    if (selectedCourses.includes(course) || conflictingCourses.includes(course) || course.meets.trim() === "") {
      continue;
    };

    const courseConflict = checkCourseConflict(newCourse.meets, course.meets);

    if (courseConflict) {
      newConflictingCourses.push(course);
    };
  };

  return newConflictingCourses;
};

export const computeOldConflictingCourses = (oldCourse, conflictingCourses) => {
  const oldConflictingCourses = [];

  for (let i = 0; i < conflictingCourses.length; i++) {
    const course = conflictingCourses[i];
    const courseConflict = checkCourseConflict(oldCourse.meets, course.meets);

    if (course.meets.trim() === "") {
      continue;
    };

    if (courseConflict) {
      oldConflictingCourses.push(course);
    };
  };

  return oldConflictingCourses;
};

const checkCourseConflict = (course1, course2) => {
  const [course1DaysArray, course1Start, course1End] = parseCourseMeetingTimes(course1);
  const [course2DaysArray, course2Start, course2End] = parseCourseMeetingTimes(course2);

  const hasCommonDay = checkDaysConflict(course1DaysArray, course2DaysArray);
  if (!hasCommonDay) {
    return false;
  };

  const timeConflict = checkTimesConflict(course1Start, course1End, course2Start, course2End);
  return timeConflict;
};

const parseCourseMeetingTimes = (course) => {
  const [days, times] = course.split(" ");

  const daysArray = daysStringToArray(days);
  const [startTime, endTime] = startAndEndTimes(times);

  return [daysArray, startTime, endTime];
};

const checkTimesConflict = (startTime1, endTime1, startTime2, endTime2) => {
  return !((endTime1 < startTime2) || (endTime2 < startTime1));
};

const checkDaysConflict = (daysArray1, daysArray2) => {
  for (let i = 0; i < NUM_DAYS; i++) {
    if (daysArray1[i] + daysArray2[i] === 2) {
      return true;
    }
  }

  return false;
};

const daysStringToArray = (days) => {
  const daysArray = Array(NUM_DAYS).fill(0);

  if (days.includes("M")) {
    daysArray[0] = 1;
  }

  if (days.includes("Tu")) {
    daysArray[1] = 1;
  }

  if (days.includes("W")) {
    daysArray[2] = 1;
  }

  if (days.includes("Th")) {
    daysArray[3] = 1;
  }

  if (days.includes("F")) {
    daysArray[4] = 1;
  }

  return daysArray;
};

const startAndEndTimes = (times) => {
  const [startString, endString] = times.split("-");
  const [startTime, endTime] = [parseTimeString(startString), parseTimeString(endString)];

  return [startTime, endTime];
}

const parseTimeString = (time) => {
  const [hour, minute] = time.split(":");
  return parseInt(hour) * 60 + parseInt(minute);
};
