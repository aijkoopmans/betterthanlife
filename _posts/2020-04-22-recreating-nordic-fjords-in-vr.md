---
layout:     post
title:      "Recreating Nordic Fjords in VR"
categories: landscape unreal world-machine virtual-reality
image:      "/images/posts/recreating_nordic_fjords/reine_overview.jpg"
sitemap:    true
excerpt:    "Sculpting your own landscape in Unreal can be hard. You might lose your inspiration while trying to make it look natural. Why don’t you use a real life existing landscape to get you started?"
---


<p class="lead">
  Get started with a real life existing landscape in Unreal.
</p>

Sculpting your own landscape in Unreal can be hard. You might lose your inspiration while trying to make it look natural. Why don’t you use a real life existing landscape to get you started? To do this, we’ll need a height map, which really is just a grayscale map with the hues of gray representing the altitude (black being the lowest altitude and white being the highest). Sounds simple enough right?

## Research

We first set off to see what sources were available to get height data from. For example, [NASA data](http://dwtkns.com/srtm){:target="_blank"} is available in both DTM30 and DTM90 format which means that any pixel in the heightmap will represent the height per 30 or 90 meters of terrain.

Other resources we looked at include [terrain.party](https://terrain.party){:target="_blank"}, [opendem.info](https://opendem.info){:target="_blank"} and [opentopography.org](https://opentopography.org){:target="_blank"}

What we quickly realized is that most of the available data did not give us the detail we were hoping to get. We had to go straight to the source and get much higher resolution DTM data. We found DTM1 to DTM5 to be the most immediately acceptable.

Thankfully many governments actually provide heightmaps as [open data](https://github.com/openterrain/openterrain/wiki/Terrain-Data){:target="_blank"} to use. The interfaces, quality and formats are different for every country but the only way to actually obtain this data.

## The data 
We wanted an iconic location that would be instantly recognizable when compared to real pictures, so we settled on the [Reine Fjord in Lofoten](https://www.google.com/search?q=Reine+Fjord&tbm=isch){:target="_blank"} for this example. The dataset is derived from data available at [hoydedata.no](https://hoydedata.no){:target="_blank"}, who provide a way to view, and download elevation data in various formats covering Norway. Requesting a digital terrain model from Høydedata might take from 10 minutes up to 24 hours, depending on the size. You’ll receive multiple files in either the GeoTIFF or USGS DEM format; both can be used.

We'll use [GDAL](https://gdal.org){:target="_blank"} tools (which are wrapped in a nice [QGIS GUI](https://www.qgis.org){:target="_blank"}) to merge the received files. After adding some hillshade, we get the following image of the Reine Fjord. Doesn’t look bad when compared to Google Maps, right?

<div id="images1" class="mb-3 twentytwenty-container">
 <img class="w-100" src="/images/posts/recreating_nordic_fjords/reine_selection_hillshade.jpg" />
 <img class="w-100" src="/images/posts/recreating_nordic_fjords/reine_selection_google_maps.jpg" />
</div>

The [landscape technical guide](https://docs.unrealengine.com/en-US/Engine/Landscape/TechnicalGuide/index.html#recommendedlandscapesizes){:target="_blank"} of Unreal suggests a number of sizes that maximize the area while minimizing the number of landscape components. We chose to crop the resulting image to an 8129x8129 image, which represents about 8 square kilometers in real life. 

## World Machine
The Norwegian data we got was in GeoTIFF format which made it easy to work with, you can even open them in Photoshop although you’ll have to change the image type from 32 bit to 16 bit to get a better idea of the heightmap. Theoretically you could simply port this heightmap to Unreal and call it a day but we wanted to have more control over the end result. 

This is where the node based terrain generator [World Machine](https://www.world-machine.com/){:target="_blank"} comes in. First we input our GeoTIFF into World Machine to get our first 3D view of the terrain. Make sure you conform the extents to be identical to the 8129x8129 format we’re working with. World Machine conveniently provides an example of using real world data and making changes to it to improve the result. This gave us a good idea of how to make changes to the original data.

Our main problem was the fact that there’s no underwater height data so the entire surface of the water is completely flat which means we need some way to lower the surface of the water and create some coastlines that fade into the water. To do this we first raised the entire height map and selected only the lowest point of the height map (the surface of the water) to lower that. We then used the thermal erosion, erosion and coastal erosion nodes to create a smooth drop-off into the water.

Finally, we can export it as a RAW16, which Unreal will accept.

## Unreal
First we take our exported heightmap and import it as a landscape in Unreal. We like using [Brushify](https://www.brushify.io){:target="_blank"} for our landscape material as it handles some of the time consuming aspects of creating a proper material automatically. What you see above is just a simple two layer material setup, using [Quixel](https://quixel.com/bridge){:target="_blank"} materials, to start with. Finally, we add 8 square kilometers of water and we get our final result:

<div id="images2" class="mb-3 twentytwenty-container">
 <img class="w-100" src="/images/posts/recreating_nordic_fjords/reine_selection_unreal.jpg" />
 <img class="w-100" src="/images/posts/recreating_nordic_fjords/reine_selection_google_maps.jpg" />
</div>

Unfortunately, some lakes don't have any water due to the fact that they aren't equal to the lowest point of the height map, which we lowered. Nevertheless, a good starting point for your unreal landscape.

<script>
$(window).on('load',function() {
  $("#images1").twentytwenty({
  	before_label: 'Hillshade',
  	after_label: 'Google Maps',
  });
  $("#images2").twentytwenty({
  	before_label: 'Unreal Landscape',
  	after_label: 'Google Maps',
  });
});
</script>