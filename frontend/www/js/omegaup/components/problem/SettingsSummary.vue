<template>
  <div class="panel">
    <h1 class="title">
      {{ title }}
      <template v-if="showVisibilityIndicators">
        <img
          src="/media/quality-badge-sm.png"
          v-bind:title="T.wordsHighQualityProblem"
          v-if="problem.quality_seal || problem.visibility === 3"
        />
        <span
          class="glyphicon glyphicon-warning-sign"
          v-bind:title="T.wordsWarningProblem"
          v-if="problem.visibility === 1 || problem.visibility === -1"
        ></span>
        <span
          class="glyphicon glyphicon-eye-close"
          v-bind:title="T.wordsPrivate"
          v-if="problem.visibility === 0 || problem.visibility === -1"
        ></span>
        <span
          class="glyphicon glyphicon-ban-circle"
          v-bind:title="T.wordsBannedProblem"
          v-if="problem.visibility <= -2"
        ></span>
      </template>
      <template v-if="showEditLink">
        (<a v-bind:href="`/problem/${problem.alias}/edit/`">{{ T.wordsEdit }}</a
        >)
      </template>
    </h1>
    <table>
      <tr>
        <th scope="row">{{ T.wordsPoints }}</th>
        <td>{{ problem.points }}</td>
        <th scope="row">{{ T.arenaCommonMemoryLimit }}</th>
        <td data-memory-limit>{{ memoryLimit }}</td>
      </tr>
      <tr>
        <th scope="row">{{ T.arenaCommonTimeLimit }}</th>
        <td>{{ timeLimit }}</td>
        <th scope="row">{{ T.arenaCommonOverallWallTimeLimit }}</th>
        <td>{{ overallWallTimeLimit }}</td>
      </tr>
      <tr>
        <template v-if="!showVisibilityIndicators">
          <th scope="row">{{ T.wordsInOut }}</th>
          <td>{{ T.wordsConsole }}</td>
        </template>
        <th scope="row">{{ T.problemEditFormInputLimit }}</th>
        <td>{{ inputLimit }}</td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  .title {
    text-align: center;
    font-size: 1.5em;
    margin: 1em;
  }
  table {
    width: 30em;
    margin: 10px auto;
    td {
      text-align: center;
    }
    th[scope='row'] {
      font-weight: bold;
    }
    td,
    th[scope='row'] {
      border: 1px solid #000;
      padding: 2px;
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import T from '../../lang';
import * as ui from '../../ui';
import { types } from '../../api_types';

@Component
export default class ProblemSettingsSummary extends Vue {
  @Prop() problem!: types.ArenaProblemDetails;
  @Prop({ default: false }) showVisibilityIndicators!: boolean;
  @Prop({ default: false }) showEditLink!: boolean;

  T = T;

  get title(): string {
    if (this.showVisibilityIndicators) {
      return `${this.problem.problem_id}. ${this.problem.title}`;
    }
    if (!this.problem.letter) {
      return this.problem.title;
    }
    return `${this.problem.letter}. ${this.problem.title}`;
  }

  get memoryLimit(): string {
    if (!this.problem.settings?.limits.MemoryLimit) {
      return '';
    }
    if (typeof this.problem.settings?.limits.MemoryLimit === 'string') {
      return this.problem.settings?.limits.MemoryLimit;
    }
    const memoryLimit = this.problem.settings?.limits.MemoryLimit as number;
    return `${memoryLimit / 1024 / 1024} MiB`;
  }

  get timeLimit(): string {
    return `${this.problem.settings?.limits.TimeLimit}`;
  }

  get overallWallTimeLimit(): string {
    return `${this.problem.settings?.limits.OverallWallTimeLimit}`;
  }

  get inputLimit(): string {
    if (!this.problem.input_limit) {
      return '';
    }
    return `${this.problem.input_limit / 1024} KiB`;
  }
}
</script>
