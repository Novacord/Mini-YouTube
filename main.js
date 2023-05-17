
let buscador = document.getElementById('buscador')

let boton = document.getElementById('botonBusqueda')

let valor



boton.addEventListener('click', (e)=>{
    valor = buscador.value
    let codigoVideo = api(valor)
    infoVideo(codigoVideo)
    comentarios(codigoVideo)
    VideoRelatedContents(codigoVideo)
})
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '837d4091fcmsh3361d584d6e55d1p16ff2djsne4ee20107e39',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

async function api(valor){
    try {
        const response = await fetch(`https://youtube138.p.rapidapi.com/search/?q=${valor}&hl=en&gl=US`, options);
        const result = await response.json();
        let res = result.contents[0].video.videoId
        return res
    } catch (error) {
        console.error(error);
    }
}


async function infoVideo(codigoVideo){
    try {
        let cont = await codigoVideo
        const response = await fetch(`https://youtube138.p.rapidapi.com/video/details/?id=${cont}&hl=en&gl=US`, options);
        const result = await response.json();
        let cuenta = document.getElementById('cuenta')
        let infCuenta = `
        <img src='${result.author.avatar[0].url}'>
        <h1>${result.author.title}</h1>
        `
        cuenta.innerHTML = infCuenta
        let sus = document.getElementById('sus')
        let infoSus = `
        <p>${result.author.stats.subscribersText}</p>
        `
        sus.innerHTML = infoSus

        let video = document.getElementById('video')
        let bloqueVideo = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${cont}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>

        </iframe>
        <h1>${result.title}</h1>
        `
        video.innerHTML = bloqueVideo

        let De = document.getElementById('De')
        let infoDe = `
        <p>${result.description}</p>
        `
        De.innerHTML = infoDe
    } catch (error) {
        console.error(error);
    }
    
    let titulo = document.getElementById('titulo')
    titulo.innerHTML ='<h1>Comentarios</h1>'
}

async function comentarios(codigoVideo) {
    let cont = await codigoVideo
    try {
      const response = await fetch(
        `https://youtube138.p.rapidapi.com/video/comments/?id=${cont}&hl=en&gl=US`,
        options
      );
      const result = await response.json();
      console.log(result);
      let comentarios = document.getElementById('comentarios');
      let caja = '';
      if (result.comments && result.comments.length > 0) {
        result.comments.forEach(element => {
          caja += `
            <li><strong>${element.author.title}:</strong> ${element.content}</li>
          `;
        });
      } else {
        caja = '<li>No hay comentarios disponibles</li>';
      }
      comentarios.innerHTML = caja;
    } catch (error) {
      console.error(error);
    }
  }

async function VideoRelatedContents(codigoVideo){
    try {
        let cont = await codigoVideo
        const response = await fetch(`https://youtube138.p.rapidapi.com/video/related-contents/?id=${cont}&hl=en&gl=US`, options);
        const result = await response.json();
        console.log(result);
        let VideoRelated = document.getElementById('descript')
        let cajaVideo = ''

        for (let i = 0; i < 3; i++) {
          cajaVideo += `
          <div>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${result.contents[i].video.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
          </div>
        `  
        }
        
        console.log(cajaVideo)
        VideoRelated.innerHTML = cajaVideo
    } catch (error) {
        console.error(error);
    }
}
  


