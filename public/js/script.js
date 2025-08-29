document.addEventListener("DOMContentLoaded", async () => {
  const comentariosContainer = document.querySelector("#comentarios");

  async function carregarComentarios() {
    try {
      const response = await fetch("/comentarios");
      console.log(response);
      if (!response.ok) throw new Error("Erro ao buscar comentários");

      const comentarios = await response.json();
      comentariosContainer.innerHTML = "";

      const lista = document.createElement("div");
      lista.classList.add("mt-10", "flex", "flex-col", "gap-3");

      comentarios.forEach((c, index) => {
        const card = document.createElement("article");
        card.className =
          `border-[#0033FF] border-2 rounded-lg p-4 lg:py-6 flex items-center gap-4 ` +
          (index % 2 === 0 ? "ml-10 -mr-2" : "mr-10 -ml-2") +
          " lg:w-[500px] w-4/5";

        card.innerHTML = `
          <img src="./images/UserComment.png" alt="Avatar usuário" class="size-12 lg:size-16">
          <div>
            <p class="text-sm">${c.comentarioEscrito}</p>
            <label class="text-xs">${c.name}</label>
          </div>
        `;
        lista.appendChild(card);
      });

      comentariosContainer.appendChild(lista);
    } catch (error) {
      console.error(error);
      comentariosContainer.innerHTML =
        "<p class='text-red-600'>Não foi possível carregar os comentários.</p>";
    }
  }

  carregarComentarios();
  window.carregarComentarios = carregarComentarios;
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
