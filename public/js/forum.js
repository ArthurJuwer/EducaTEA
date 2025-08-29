document.addEventListener("DOMContentLoaded", () => {
  const userNameInput = document.querySelector("#userName");
  const comentarioInput = document.querySelector("#comentario");
  const comentariosContainer = document.querySelector("#comentarios-container");

  async function carregarComentarios() {
    try {
      const response = await fetch("http://localhost:3000/comentarios");
      if (!response.ok) throw new Error("Erro ao buscar comentários");

      const comentarios = await response.json();
      comentariosContainer.innerHTML = "";

      comentarios.forEach((c) => {
        const card = document.createElement("div");
        card.className = "bg-white p-4 rounded-lg shadow-md";

        card.innerHTML = `
          <h3 class="font-bold text-lg mb-2">${c.name}</h3>
          <p class="text-gray-800">${c.comentarioEscrito}</p>
        `;
        comentariosContainer.appendChild(card);
      });
    } catch (error) {
      console.error(error);
      comentariosContainer.innerHTML =
        "<p class='text-red-600'>Não foi possível carregar os comentários.</p>";
    }
  }

  // Carrega comentários ao abrir a página
  carregarComentarios();

  // Torna a função global para recarregar após criar comentário
  window.carregarComentarios = carregarComentarios;
  
  // ====== FORMULÁRIO DE COMENTÁRIOS ======
  const form = document.querySelector("#form-comentario"); // <- ID do <form>, não do botão
  const btnPublicar = document.querySelector("#btn-publicar");

  btnPublicar.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!userNameInput || !comentarioInput) {
      alert("Campos do formulário não encontrados!");
      return;
    }

    const name = userNameInput.value.trim(); // <- agora 'name' para bater com o controller
    const comentarioEscrito = comentarioInput.value.trim();

    if (!name || !comentarioEscrito) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/comentarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, comentarioEscrito }), // <- agora correto
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Erro ao criar comentário");
      }

      const novoComentario = await response.json();
      alert("Comentário criado com sucesso!");

      // limpa os campos
      form.reset();

      // recarrega a lista de comentários se a função existir
      if (typeof carregarComentarios === "function") {
        carregarComentarios();
      }

    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
      alert("Não foi possível enviar o comentário.");
    }
  });
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

btnClose.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden"); // abre/fecha
  overlay.classList.toggle("hidden"); // abre/fecha
});
