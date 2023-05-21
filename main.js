import './style.css'
import $ from 'jquery';
import QRCode from 'qrcode';


var canvas = document.getElementById('canvas');

$('#encode').on('click',() => {
  QRCode.toCanvas(canvas,$('#source').val(),function(error){
    if(error) console.error(error);
    console.log('success');
  })
  
})
