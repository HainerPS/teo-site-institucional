const form = document.getElementById("leadForm");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";
    formMessage.textContent = "";

    const formData = new FormData(form);

    const lead = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      telefone: formData.get("telefone"),
      empresa: formData.get("empresa"),
      mensagem: formData.get("mensagem"),
      origem: "Site Institucional"
    };

    try {
      const response = await fetch("https://teo-backend-az8f.onrender.com/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(lead)
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
      }

      form.reset();
      formMessage.textContent = "Mensagem enviada com sucesso!";
      formMessage.classList.add("success");
      formMessage.classList.remove("error");
    } catch (error) {
      formMessage.textContent = "Erro ao enviar. Tente novamente.";
      formMessage.classList.add("error");
      formMessage.classList.remove("success");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar mensagem";
    }
  });
}