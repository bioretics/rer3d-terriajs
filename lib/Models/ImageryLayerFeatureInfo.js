"use strict";

/*global require*/
var ImageryLayerFeatureInfo = require("terriajs-cesium/Source/Scene/ImageryLayerFeatureInfo")
  .default;
var defined = require("terriajs-cesium/Source/Core/defined").default;

var formatPropertyValue = require("../Core/formatPropertyValue");

// To check if a feature contains unsafe HTML code.
var htmlRegex = /^\s*<[^>]+>/;

/**
 * Configures the description of this feature by creating an HTML table of properties and their values.
 *
 * @param {Object} properties An object literal containing the properties of the feature.
 */
ImageryLayerFeatureInfo.prototype.configureDescriptionFromProperties = function(
  properties
) {
  function describe(properties) {
    var html = '<table class="cesium-infoBox-defaultTable">';
    for (var key in properties) {
      if (properties.hasOwnProperty(key)) {
        var value = properties[key];
        if (defined(value)) {
          // Skip values with unsafe HTML code.
          if (htmlRegex.test(value)) {
            continue;
          }
          if (typeof value === "object") {
            html +=
              "<tr><td>" + key + "</td><td>" + describe(value) + "</td></tr>";
          } else {
            html +=
              "<tr><td>" +
              key +
              "</td><td>" +
              formatPropertyValue(value) +
              "</td></tr>";
          }
        }
      }
    }
    html += "</table>";

    return html;
  }

  this.description = describe(properties);
};
