import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home/HomePage";
import { DadosBase } from "./Pages/DadosBase/DadosBasePage";
import { Resumo } from "./Pages/Resumo/Resumo";
import { SemSaque } from "./Pages/Resumo/SemSaque";
import { FidelizacaoCompleta } from "./Pages/FidelizacaoCompleta/FidelizacaoCompletaPage";
import { DadosBancPage } from "./Pages/DadosBanc/DadosBancarioPage";
import { Providers } from "./components/providers";
import { Aguarde } from "./Pages/Resumo/Aguarde";


function App() {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dadosbase" element={<DadosBase />} />
          <Route path="/dadosbancarios" element={<DadosBancPage />} />
          <Route path="/resumo" element={<Resumo />} />
          <Route path="/semsaque" element={<SemSaque />} />
          <Route path="/aguarde" element={<Aguarde />} />
          <Route path="/fidelizacaocompleta" element={<FidelizacaoCompleta />} />
        </Routes>
      </Router>
    </Providers>
  );
}

export default App;
