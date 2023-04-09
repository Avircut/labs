import "./style.css";
import $ from "jquery";

let compress = (source) => {
  let probsStrings = $("#probs").val().split(";");
  let probs = new Map();
  let probBefore=0;
  let probAfter = 0;
  probsStrings.forEach((element) => {
    let values = element.split("-");
    let probability = parseFloat(values[1]);
    probAfter=1-probability-probBefore;
    probs.set(values[0],{prob:probability,probBefore:probBefore,probAfter:probAfter});
    probBefore+=probability;
  });
  let beg = 0;
  let end = 1;

  for(let i =0; i<source.length;i++){
    let tempBeg = beg;
    beg+=probs.get(source.charAt(i)).probBefore*(end-tempBeg);
    end-=probs.get(source.charAt(i)).probAfter*(end-tempBeg);
  }
  return `${beg}`;
};
let decode = (source) => {
  let probsStrings = $("#probs").val().split(";");
  let probs = new Map();
  let probBefore=0;
  let probAfter = 0;
  let begin = 0;
  let end = 0;
  let result = '';
  probsStrings.forEach((element) => {
    let values = element.split("-");
    let probability = parseFloat(values[1]);
    probAfter=1-probability-probBefore;
    probs.set(values[0],{prob:probability,probBefore:probBefore,probAfter:probAfter});
    probBefore+=probability;
  });
  let code = parseFloat(source);
  let i = 0;
  while(code >=0.00001){
    probs.forEach((value,key) => {
      if(code>=value.probBefore && code < 1-value.probAfter){
        console.log(`(${code} - ${value.probBefore}) / ${value.prob} = ${(code-value.probBefore) / value.prob}`)
        code = (code-value.probBefore) / value.prob;
        result+=key;
      }
    })
    if(++i==100) break;
  }
  return result;
}
$("#encode").on("click", () => {
  let src = $("#source").val();
  let encoded = compress(src);
  $("#result").val(encoded);
});
$("#decode").on("click", () => {
  let src = $("#source").val();
  let decoded = decode(src);

  $("#result").val(decoded);
});
