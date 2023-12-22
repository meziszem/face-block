import React from 'react';
import ParticlesBg from 'particles-bg'

const config = {
    num: [4, 7],
    rps: 0.1,
    radius: [5, 40],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-40, 40],
    // body: "cobweb", // Whether to render pictures
    // rotate: [0, 20],
    alpha: [0.6, 0],
    scale: [1, 0.1],
    position: "all", // all or center or {x:1,y:1,width:100,height:100}
    color: ["#0000", "#0000"],
    cross: "dead", // cross or bround
    random: 15,  // or null,
    g: 2,    // gravity
    f: [2, -1], // force
    onParticleUpdate: (ctx, particle) => {
        ctx.beginPath();
        ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
    }
  };

const Particles = () => {
    return (
   <div>     
       <ParticlesBg type="cobweb" config={config} bg={true} />
   </div>
    )
  }
  
  export default Particles;

