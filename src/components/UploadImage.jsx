import { useState } from 'react';

function UploadImage() {
  const [imageUrl, setImageUrl] = useState('');
  const url = "https://bggoneapi.up.railway.app/";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', event.target.image.files[0]);

    try {
      const response = await fetch(`${url}/remove-bg`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao processar a imagem');
      }

      if(response.ok){
        document.getElementById("load").style.visibility = 'hidden';
      }

      const data = await response.json();
      console.log('URL da imagem:', data.imageUrl);

      // Garantir que a URL seja montada corretamente
      setImageUrl(`${url}${data.imageUrl}`);
    } catch (error) {
      console.error('Erro ao enviar a imagem:', error);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;

    const filename = imageUrl.split('/').pop();  // Extrai o nome do arquivo
    const downloadUrl = `${url}/download/${filename}`; // URL de download

    // Criar e acionar o link para download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
        <header>
          <h1 class="logo-name">BgGone </h1>
          <div class="links">
              <a href="https://github.com/PatrikMaltacm">GitHub</a>
          </div>
        </header>

        <h1 className="title">Enviar Imagem</h1>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="image" className="upload-label">
            <span>Selecione uma imagem para remover o fundo</span>
          </label>
          <input
            type="file"
            name="image"
            id="image"
            required
            className="input-file"
            accept="image/*"
          />
          <button type="submit" className="input-button" onClick={()=>{
            document.getElementById("load").style.visibility = "visible"
          }}>Enviar Imagem</button>
        </form>
        
        <div className="loading-container">
          <div className="loading-ball" id='load'></div>
        </div>

        {imageUrl && (
          <div className="processed-image-container">
            <h2>Imagem Processada</h2>
            <img src={imageUrl} alt="Imagem Processada" className="processed-image" />
            <button onClick={handleDownload} className="download-button">Baixar Imagem</button>
          </div>
        )}

      <footer className="footer">
        <p>&copy; 2025 BgGone  - Todos os direitos reservados.</p>
        <p>Desenvolvido por <a href="https://patrikmalta.netlify.app" target="_blank" rel="noopener noreferrer">Patrik Malta</a></p>
      </footer>
    </div>
    

  );
}

export default UploadImage;
