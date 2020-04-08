
var body = document.body;

function checkWindow() {
    if (window.innerWidth < 992 && !body.classList.contains('mini-sidebar')) {
        body.classList.add('drawer-sidebar');
    }
}

//document.addEventListener('DOMContentLoaded', init);
//window.addEventListener('resize', checkWindow);

function backdrop(el) {
    el.classList.toggle('shined');
    body.classList.toggle('has-backdrop');
    return el;
}

function toggleAside() {
	if( body.classList.contains('drawer-sidebar') ) {
        backdrop(document.getElementById('sidebar'));
    } else {
        body.classList.toggle('mini-sidebar');
    }
}

function closeShined() {
    body.classList.remove('has-backdrop');
    document.querySelector('.shined').classList.remove('shined');
}


function init() {
    checkWindow();
    document.querySelector('.backdrop').addEventListener('click', closeShined);
}

/*
Way 1



*/


/*
TS: toggle sidebar

//let body = new ElementRef('body').nativeElement;
if(document.body.classList.contains('drawer-sidebar')) {
  console.log('backdrop');
} else {
  document.body.classList.toggle('mini-sidebar');
  //this.renderer.setElementClass(document.body, 'modal-open', true);
}
*/
