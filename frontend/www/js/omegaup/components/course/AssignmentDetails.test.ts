import { shallowMount } from '@vue/test-utils';
import expect from 'expect';
import Vue from 'vue';

import T from '../../lang';
import { omegaup } from '../../omegaup';
import { types } from '../../api_types';

import course_AssignmentDetails from './AssignmentDetails.vue';

describe('AssignmentDetails.vue', () => {
  it('Should handle empty assignments and progress as admin', () => {
    const wrapper = shallowMount(course_AssignmentDetails, {
      propsData: {
        assignment: <omegaup.Assignment>{},
        update: false,
        show: true,
        finishTimeCourse: new Date(),
        startTimeCourse: new Date(),
        unlimitedDurationCourse: false,
        columnError: '',
      },
    });

    expect(
      wrapper.find('form.schedule button[type=submit].submit').text(),
    ).toBe(T.courseAssignmentNewFormSchedule);
  });
});
