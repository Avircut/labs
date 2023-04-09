import './style.css'
import $ from 'jquery';
import LZ78 from 'lz78';

function encoder(data) {
  let result = [], index = 0, indexes = {'': index}, prefix = '';
  for (let c of data) {
      prefix += c;
      if (! indexes[prefix]) {
          indexes[prefix] = ++index;
          result.push(indexes[prefix.slice(0, -1)], c);
          prefix = '';
      }
  }
  if (prefix)
      result.push(indexes[prefix]);
  return result.join('');
}

function decoder(data) {
  let result = [], prefixes = [''], reg = /(\d+)(.?)/g, match;
  while ((match = reg.exec(data)) !== null) {
      let s = prefixes[+match[1]] + match[2];
      prefixes.push(s);
      result.push(s);
  }
  return result.join('');
}

$('#encode').on('click',() => {
  $('#result').val((encoder($('#source').val())));
  $('#srcLength').html($('#source').val().length);
  $('#resLength').html($('#result').val().length);
  let ratio = $('#result').val().length / $('#source').val().length
  $('#ratio').html((Math.round((1-ratio) * 100)/100)*100 +'%');
  
})
$('#decode').on('click',() => {
  $('#result').val((decoder($('#source').val())));
})
