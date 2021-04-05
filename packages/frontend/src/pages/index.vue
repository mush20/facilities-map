<template>
  <div class="h-100 w-100">
    <AutoComplete :data="results" @search="test" @select="setSelected" />
    <Map :locations="items" :selected="selected" />
  </div>
</template>

<script lang="ts">
import AutoComplete from "@/components/AutoComplete.vue";
import Map from "@/components/Map.vue";
import { Component, Vue } from "nuxt-property-decorator";

import { Facilities } from "@/store/facilities";

@Component({ components: { Map, AutoComplete } })
export default class HomePage extends Vue {
  @Facilities.State
  public results!: string[];

  @Facilities.State
  public selected!: string[];

  @Facilities.State
  public items!: unknown[];

  @Facilities.Action
  public fetchAll!: () => void;

  @Facilities.Mutation
  public search!: (text: string) => void;

  @Facilities.Mutation
  public setSelected!: (text: string) => void;

  mounted() {
    this.fetchAll();
  }

  test(test: string) {
    this.search(test);
    console.log(`viva-${test}`);
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
