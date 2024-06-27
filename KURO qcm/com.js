fetch('https://jsonplaceholder.typicode.com/comments')
  .then(response => response.json())
  .then(comments => {
    for (let i = 0; i < 10; i++) {
      const comment = comments[i];
      const commentText = `${i + 1} : ${comment.name} - ${comment.email} - ${comment.body}`;
      document.write(`<p>${commentText}</p>`); // Écrit le commentaire dans la page HTML
    }
  })
  .catch(error => {
    console.error('Une erreur s\'est produite:', error);
  });
