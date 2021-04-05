<template>
  <div class="autocomplete">
    <b-form-input
      autocomplete="off"
      id="popover-search"
      placeholder="Search..."
      v-model="search"
    />
    <b-popover
      :show="show"
      placement="leftbottom"
      target="popover-search"
      :triggers="null"
    >
      <section class="result-list">
        <b-list-group>
          <b-list-group-item
            :key="item.id"
            @click="handleSelect(item.id)"
            class="flex-column align-items-start"
            v-for="item in data"
          >
            <div class="d-flex w-100 justify-content-between">
              <h6>{{ item.name }}</h6>
              <small>Status: {{ item.status }}</small>
            </div>
            <div class="d-flex w-100 justify-content-between">
              <small>{{ item.foodItems }}</small>
              <small>{{ item.location }}</small>
            </div>
          </b-list-group-item>
        </b-list-group>
      </section>
    </b-popover>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from "nuxt-property-decorator";
import { ReplaySubject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component
export default class AutoComplete extends Vue {
  search = "";
  search$ = new ReplaySubject<string>();
  show = false;

  @Prop({ default: [] })
  readonly data!: unknown[];

  mounted() {
    this.search$
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(this.handleSearch);
  }

  @Emit("search")
  handleSearch(value: string) {
    return value;
  }

  @Emit("select")
  handleSelect(value: string) {
    this.show = false;
    return value;
  }

  @Watch("search")
  searchChange(val: string) {
    this.search$.next(val);
  }

  @Watch("data")
  handleData(val: unknown[]) {
    console.log(val.length);
    this.show = val.length > 0;
  }
}
</script>

<style lang="scss">
#popover-search {
  border-radius: 0;
}

.gm-style-iw {
  padding: 0!important;
}

.popover {
  max-width: none;
  width: 100%;
  margin-left: 50px;
  margin-top: 25px;
  border-radius: 0;

  &-body {
    padding: 0;
  }

  .arrow {
    display: none !important;
  }

  .list-group-item {
    &:hover {
      background-color: var(--primary);
      color: white;
      cursor: pointer;
    }
  }

  .result-list {
    max-height: 300px;
    overflow-y: scroll;
  }
}
</style>
