const fetch = require('node-fetch')

const shell = require('shelljs')

function tablog(...p) {
  let outp = ''
  for (let x of p) {
    outp += x;
    outp += '\t'
  }
  console.log(outp)
}

function getlocation(ip) {
  let loc = shell.exec (`curl -s https://ipvigilante.com/${ip}| jq '.'|grep name|cut -d' ' -f6-|tr -d '[",'`,{silent:true}).stdout
  console.log(loc)
  loc = loc.replace(/(\r\n|\n|\r)/gm,",")
  loc = loc.replace(/null/g,"")
  loc = loc.replace(/\,\,/gm,",")
 
  return loc
}

let json = shell.exec('vast search offers --raw',{silent:true}).stdout
let offers = JSON.parse(json)

for (let offer of offers) {
  let {id,dph_total,cpu_cores_effective,gpu_name,public_ipaddr} = offer
  let loc = getlocation(public_ipaddr)
  tablog(id,dph_total,cpu_cores_effective,gpu_name,loc)
}
/*
while read ip; do
  echo '------------------------'
  echo $ip
  curl -s https://ipvigilante.com/$ip| jq '.'|grep name|cut -d' ' -f6-|tr -d '[",'
  echo '------------------------'
  sleep 1
done < ips.txt
*/
