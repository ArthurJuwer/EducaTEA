document.addEventListener("DOMContentLoaded", () => {
  // ====== MENU MOBILE ======
  const btnMenu = document.getElementById("btn-menu");
  const btnClose = document.getElementById("btn-close");
  const overlay = document.getElementById("overlay");
  const mobileMenu = document.getElementById("mobile-menu");

  if (btnMenu && btnClose && overlay && mobileMenu) {
    btnMenu.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
    });

    btnClose.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
    });
  }

  // ====== FORMULÁRIO DE COMENTÁRIOS ======
  const form = document.querySelector<HTMLFormElement>("#form-comentario");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const userIdInput = document.querySelector<HTMLInputElement>("#userId");
      const comentarioInput = document.querySelector<HTMLTextAreaElement>("#comentario");

      if (!userIdInput || !comentarioInput) {
        alert("Campos do formulário não encontrados!");
        return;
      }

      const userId = userIdInput.value.trim();
      const comentarioEscrito = comentarioInput.value.trim();

      if (!userId || !comentarioEscrito) {
        alert("Preencha todos os campos!");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/comentarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, comentarioEscrito }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || "Erro ao criar comentário");
        }

        const novoComentario = await response.json();
        alert("Comentário criado com sucesso!");

        // limpa o form
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
  }
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