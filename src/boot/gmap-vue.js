import Vue from "vue";
import * as GmapVue from "gmap-vue";
// for some reason process.env will add always add double quote on value so we have to remove them

Vue.use(GmapVue, {
  load: {
    // key: process.env.GOOGLE_MAP_API.replace(/"/g, ""),
    key: "AIzaSyByeeufWvZT9GcXzWNSUoZs7ycQSUxaIJI",
    libraries: "geometry, places" // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    // // If you want to set the version, you can do so:
    // v: '3.26',
  },

  // // If you intend to programmatically custom event listener code
  // // (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  // // instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  // // you might need to turn this on.
  // autobindAllEvents: false,

  // // If you want to manually install components, e.g.
  // // import {GmapMarker} from 'gmap-vue/src/components/marker'
  // // Vue.component('GmapMarker', GmapMarker)
  // // then set installComponents to 'false'.
  // // If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
});
import GmapCluster from "gmap-vue/dist/components/cluster"; // replace dist with src if you have Babel issues

Vue.component("GmapCluster", GmapCluster);
