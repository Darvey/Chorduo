<template>
  <div id="app">
    <header class="header">
	    <nav class="header-menu">
		    <a href="#" class="header-menu-link"><i class="icon icon-menu"></i></a>
		    <a href="#" class="header-menu-link"><i class="icon icon-library"></i></a>
	    </nav>

	    <search-input></search-input>

	    <div class="header-song">
		    <a href="#" class="header-song-link">
			    <span>Song name</span>
			    <i class="icon icon-edit"></i></a>
	    </div>
		</header>
	  <div class="panels">
		  <div class="panels-column is-left">
			  <panel-edition></panel-edition>
			  <panel-palette></panel-palette>
		  </div>
		  <div class="panels-column is-right">
			  <panel-details></panel-details>
		  </div>
	  </div>
  </div>
</template>

<script>
	import PanelEdition from "./components/panels/PanelEdition";
	import PanelDetails from "./components/panels/PanelDetails";
	import PanelPalette from "./components/panels/PanelPalette";
	import SearchInput from "./components/input/SearchInput";
	import MIDIDevice from '../device/MIDIDevice'


  export default {
    name: 'chorduo',
    components: {
      PanelEdition,
	    PanelDetails,
			PanelPalette,
			SearchInput
    }
  }
</script>

<style lang="scss">
  @import "../scss/global";

  @import "../scss/layout/header";
  @import "../scss/layout/panels";

  @import "../scss/utils/icons";
  @import "../scss/utils/transitions";
  @import "../scss/utils/easings";

  @import "../scss/components/buttons";
  @import "../scss/components/list";
  @import "../scss/components/overlay";
</style>
