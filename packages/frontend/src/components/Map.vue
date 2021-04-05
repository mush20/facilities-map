<template>
  <section class="h-100 w-100">
    <div class="info-windows h-100 w-100">
      <google-map :center="center" :zoom="zoom" id="map" ref="Map">
        <google-map-marker
          :clickable="true"
          :key="location.id"
          :position="calculatePosition(location)"
          @click="toggleInfoWindow(location)"
          v-for="location in locations"
        />
        <google-map-infowindow
          :options="{ maxWidth: 300 }"
          :position="infoContext.position"
          :show.sync="showInfo"
          @info-window-clicked="infoClicked"
        >
          <b-card
            :sub-title="infoContext.description"
            :title="infoContext.title"
          >
            <b-card-text>
              Some quick example text to build on the <em>card title</em> and
              make up the bulk of the card's content.
            </b-card-text>

            <b-card-text>A second paragraph of text in the card.</b-card-text>
          </b-card>
        </google-map-infowindow>
      </google-map>
    </div>
  </section>
</template>
<script lang="ts">
import "vuejs-google-maps/dist/vuejs-google-maps.css"
import { Facility } from "~/store/facilities"

import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"

@Component({})
export default class Map extends Vue {
  showInfo = false
  zoom = 13
  sanFrancisco = { lat: 37.73719423068097, lng: -122.45203170721543 }
  center = this.sanFrancisco

  infoContext = {
    position: {
      lat: 44.2899,
      lng: 11.8774,
    },
    title: "",
    description: "",
  }

  @Prop({ default: [], required: true })
  locations!: Facility[]

  @Prop({ default: null })
  selected!: Facility | null

  @Watch("selected")
  handleSelected(val: Facility) {
    if (val) {
      this.toggleInfoWindow(val)
    }
  }

  calculatePosition(item: Facility) {
    return { lat: item.latitude, lng: item.longitude }
  }

  toggleInfoWindow(context: Facility) {
    this.infoContext = {
      position: this.calculatePosition(context),
      title: context.name,
      description: context.foodItems,
    }
    this.showInfo = true
  }

  infoClicked() {
    this.showInfo = false
  }
}
</script>

<style lang="scss">
.gm-style-iw {
  border-radius: 0 !important;
  max-width: none !important;

  button {
    &.gm-ui-hover-effect {
      display: none !important;
    }
  }

  .gm-style-iw-d {
    overflow: hidden !important;
  }
}
</style>
