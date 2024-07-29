setTimeout(function() {
    console.log("Timeout test");
  
    // select the target node
    var target = document.querySelector("svg g.hoverlayer");
  
    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        console.log(mutation);
        if (mutation.addedNodes.length > 0) {
          string = mutation.addedNodes[0].childNodes[1].childNodes[3].innerHTML;
          imgPath = string.substring(string.indexOf('formatted_df$item: ') + 19);
  
          if (imgPath.length > 0) {
            console.log(imgPath);
            localPath = 'file:///Users/antonwrisberg/Library/CloudStorage/Box-Box/LUCS/PhD/Research/Waste Sorting/Online Experiments/waste-stimuli-evaluation/assets/img/stimuli-rf-sorted/';
            remotePath = 'https://antonwrisberg.github.io/waste-stimuli-evaluation/assets/img/stimuli-rf-sorted/'
            document.getElementById('hoverImage').setAttribute('src', remotePath + imgPath);
          }
        }
      })
    });
  
    // configuration of the observer:
    var config = {
      childList: true
    };
  
    // pass in the target node, as well as the observer options
    observer.observe(target, config);
  
    var oImg = document.createElement("img");
    oImg.setAttribute('src', 'index.jpg');
    oImg.setAttribute('id', 'hoverImage');
    oImg.setAttribute('draggable', false)
    oImg.style.height = '300px';
    oImg.style.width = '300px';
    oImg.style.position = 'absolute';
    oImg.style.bottom = '10px';
    oImg.style.right = '10px';
    oImg.style.cursor = 'move';
    document.body.appendChild(oImg);

    document.getElementById('hoverImage').addEventListener('mousedown', function(event) {
      mouseDistFromTop = event.pageY - document.getElementById('hoverImage').getBoundingClientRect().y;
      mouseDistFromLeft = event.pageX - document.getElementById('hoverImage').getBoundingClientRect().x;
      console.log(event);

      controllerInteraction = new AbortController();
      signalInteraction = controllerInteraction.signal;

      document.addEventListener('mousemove', function(event) {
        document.getElementById('hoverImage').style.top = event.pageY - mouseDistFromTop + 'px';
        document.getElementById('hoverImage').style.left = event.pageX - mouseDistFromLeft + 'px';
        console.log(event);

        console.log(document.getElementById('hoverImage').style.bottom);
      }, {signal: signalInteraction})

      document.addEventListener('mouseup', function(event) {
        controllerInteraction.abort();
      }, {once: true})
    })

    
  }, 500)