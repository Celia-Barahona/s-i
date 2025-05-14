const correctAnswer = "Este texto cero cero cero cero contiene algo de relleno pero en el fondo uno cero cero uno tiene una historia bonita cero cero uno cero a la par que peculiar. Si estas leyendo esto cero cero cero cero significa que has adivinado el cero cero cero uno pasatiempo que nos une cero cero cero uno. Os queremos mucho.";

document.getElementById("checkMessageButton").addEventListener("click", () => {
  const userResponse = document.getElementById("decodedText").value.trim();
  
  if (userResponse === correctAnswer) {
    alert("¡Correcto! Has descifrado el mensaje. 🎉");

    // Generar dinámicamente el nuevo input para la fecha
    const inputSection = document.querySelector(".input-section");
    
    // Verificar si el input ya existe (evitar duplicados)
    if (!document.getElementById("dateInput")) {
      const dateInput = document.createElement("input");
      dateInput.type = "text";
      dateInput.id = "dateInput";
      dateInput.className = "styled-date-input"; // Añadimos la clase para aplicar estilos
      dateInput.placeholder = "Introduce el número";
      dateInput.maxLength = 6; // Limitar la longitud del input

      const checkDateButton = document.createElement("button");
      checkDateButton.id = "checkDateButton";
      checkDateButton.textContent = "Comprobar número";
      checkDateButton.style.marginTop = "10px";

      // Añadir el input y el botón al DOM
      inputSection.appendChild(dateInput);
      inputSection.appendChild(checkDateButton);

      // Añadir evento al botón de comprobar fecha
      checkDateButton.addEventListener("click", () => {
        const enteredDate = dateInput.value.trim();
        if (enteredDate === "092011") {
          alert("¡Número correcto! 🎉 Habéis completado el desafío final. Si vuestro regalo queréis obtener, este número debéis entender.");
        } else {
          alert("Número incorrecto. Intenta de nuevo. ❌");
        }
      });
    }
  } else {
    alert("Respuesta incorrecta. Intenta de nuevo. ❌");
  }
});