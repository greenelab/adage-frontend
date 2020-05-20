window.onload = () => {
  const pdf = document.querySelector('.pdf');
  const links = document.querySelectorAll('.list > a');

  const onClick = (event) => {
    event.preventDefault();
    const link = event.target;
    pdf.data = link.href;
    for (const link of links)
      link.dataset.active = false;
    link.dataset.active = true;
  };

  for (const link of links)
    link.addEventListener('click', onClick);
};
