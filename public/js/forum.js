document.addEventListener("DOMContentLoaded", () => {
    // Preenche as informações
    document.querySelector(".info-title").textContent = campData.name;
    document.querySelector(".info-desc").textContent =
  
  
    // Entrar no campeonato
    btnEntrar.addEventListener("click", async () => {
      try {
        const response = await fetch("http://localhost:3000/participantes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            CampId: campData.id,
          }),
        });
  
        if (!response.ok) {
          const error = await response.json();
          alert("Erro: " + error.message);
          return;
        }
  
        const data = await response.json();
        console.log("Participante cadastrado:", data);
        alert("Você entrou no campeonato com sucesso!");
      } catch (err) {
        console.error("Erro na requisição:", err);
        alert("Erro ao entrar no campeonato. Tente novamente.");
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

  // Fecha o menu ao clicar em um link
  btnClose.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden"); // abre/fecha
    overlay.classList.toggle("hidden"); // abre/fecha
  });