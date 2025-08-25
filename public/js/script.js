{/* <div class="mt-10 flex flex-col gap-3 ">

                    <article class="border-[#0033FF] border-2 rounded-lg p-4 lg:py-6 flex items-center gap-4 ml-10 -mr-2 lg:w-[500px]">
                        <img src="./images/UserComment.png" alt="" class="size-12 lg:size-16">
                        <div class="">
                            <p class="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <label for="" class="text-xs">Arthur Juwer</label>
                        </div>
                    </article>  

                    <article class="border-[#0033FF] border-2 rounded-lg p-4 lg:py-6 flex items-center gap-4 mr-10 -ml-2 lg:w-[500px]">
                        <img src="./images/UserComment.png" alt="" class="size-12 lg:size-16">
                        <div class="">
                            <p class="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <label for="" class="text-xs">Arthur Juwer</label>
                        </div>
                    </article> 


                    <article class="border-[#0033FF] border-2 rounded-lg p-4 lg:py-6 flex items-center gap-4 ml-10 -mr-2 lg:w-[500px]">
                        <img src="./images/UserComment.png" alt="" class="size-12 lg:size-16">
                        <div class="">
                            <p class="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <label for="" class="text-xs">Arthur Juwer</label>
                        </div>
                    </article> 
                </div> */}
                document.addEventListener("DOMContentLoaded", () => {
                    const API_URL = "http://localhost:3000/campeonato";
                    const containerCards = document.querySelector("#container-campeonatos .rowCamp");
                    const formPesquisa = document.getElementById("pesquisa-header");
                    const inputPesquisa = formPesquisa.querySelector("input");
                  
                    let campeonatos = []; // armazenar todos para filtrar depois
                  
                    // Função para criar um card de campeonato
                    function criarCard(camp) {
                      const col = document.createElement("div");
                      col.className = "col";
                      
                      col.innerHTML = `
                        <div class="card shadow-sm">
                          <img class="card-img-top" src="${camp.fotoCampeonato || "https://via.placeholder.com/150"}" alt="Thumbnail">
                          <div class="card-body">
                            <h5 class="card-title">${camp.name}</h5>
                            <p class="card-text">${camp.description || ""}</p>
                            <div class="d-flex justify-content-between align-items-center">
                              <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary" data-camp-id="${camp.id}">Ver</button>
                              </div>
                              <small class="text-body-secondary">${camp.date ? new Date(camp.date).toLocaleDateString() : "Sem data"}</small>
                            </div>
                          </div>
                        </div>
                      `;
                  
                      const botaoVer = col.querySelector("button");
                      botaoVer.addEventListener("click", () => {
                        localStorage.setItem("campData", JSON.stringify(camp));
                        window.location.href = "entraCamp.html";
                      });
                      return col;
                    }
                  
                    // Função para exibir lista de campeonatos
                    function exibirCampeonatos(lista) {
                      containerCards.innerHTML = "";
                  
                      if (!lista || lista.length === 0) {
                        containerCards.innerHTML = `<p class="text-center">Nenhum campeonato encontrado.</p>`;
                        return;
                      }
                  
                      lista.forEach(camp => {
                        containerCards.appendChild(criarCard(camp));
                      });
                    }
                  
                    // Função para carregar todos os campeonatos
                    async function carregarTodos() {
                      try {
                        const response = await fetch(API_URL);
                        if (!response.ok) throw new Error(`Erro ao carregar campeonatos: ${response.status}`);
                        campeonatos = await response.json();
                        exibirCampeonatos(campeonatos);
                      } catch (err) {
                        console.error(err);
                        containerCards.innerHTML = `<p class="text-center text-danger">Erro ao carregar campeonatos.</p>`;
                      }
                    }
                  
                    // Função para filtrar campeonatos
                    function filtrarCampeonatos(termo) {
                      const termoNormalizado = termo.toLowerCase().trim();
                      if (termoNormalizado === "") {
                        exibirCampeonatos(campeonatos); // mostra todos se vazio
                      } else {
                        const filtrados = campeonatos.filter(camp => 
                          camp.name.toLowerCase().includes(termoNormalizado) || 
                          (camp.description && camp.description.toLowerCase().includes(termoNormalizado))
                        );
                        exibirCampeonatos(filtrados);
                      }
                    }
                  
                    // Evento de pesquisa (ao enviar o form ou apertar Enter)
                    formPesquisa.addEventListener("submit", (e) => {
                      e.preventDefault();
                      filtrarCampeonatos(inputPesquisa.value);
                    });
                  
                    // Carrega os campeonatos ao abrir a página
                    carregarTodos();
                  });


  // MENU MOBILE

                    const btnMenu = document.getElementById("btn-menu");
  const btnClose = document.getElementById("btn-close");
  const overlay = document.getElementById("overlay");
  const mobileMenu = document.getElementById("mobile-menu");

  btnMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden"); // abre/fecha
    overlay.classList.toggle("hidden"); // abre/fecha
  });

  // Fecha o menu ao clicar em um link
  btnClose.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden"); // abre/fecha
    overlay.classList.toggle("hidden"); // abre/fecha
  });
  