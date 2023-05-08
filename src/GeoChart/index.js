import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function GeoChart({ country, width, height }) {
  const svgRef = useRef();

  useEffect(() => {
    try{
    const svg = d3.select(svgRef.current);

    const projection = d3.geoMercator().scale(140).translate([width/2, height/2]);
    const path = d3.geoPath(projection)
    
    const g= svg.append('g');
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(data => {
          const countries = topojson.feature(data, data.objects.countries);
          g.selectAll('path')
            .data(countries.features)
            .enter()
            .append('path')
            .attr('class', 'country')
            .attr('d', path)
            .style('fill', d => {
              return d.properties.name.includes(country) ? '#669efb' : '#ccc'
            });
            ;
      })
    }catch(e){
      console.log(e)
    }
  }, [width, height, country]);

  useEffect(() => {
    console.log('svgRef', svgRef)

    // Highlight the country on the Geo Chart
    // svgRef?.current?.selectAll('g').selectAll('path')
    // .style('fill', d => d.properties.name === country ? 'red' : 'gray');
  } , [country])

  return (
    <div style={{ width: `100%`, height: `100%`}}>
      <svg ref={svgRef} style={{ width: '100%', height: '95%', padding:'15px'}}>
      </svg>
    </div>
  );
}

export default GeoChart;
