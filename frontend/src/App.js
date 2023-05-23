import './App.css';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Football from './Component/Football/Football';
import Cricket from './Component/Cricket/Cricket';
import LivePlay from './Component/LivePlay/LivePlay';
import Chat from './Component/Chat/Chat';
import News from './Component/News/News';
import Promotions from './Component/Promotions/Promotions';
import Login from './Component/Login/Login';
import Homepage from './Component/Homepage/Homepage';
import PrivacyPolicy from './Component/TermsConditions';
import TermsConditions from './Component/TermsConditions';

function App() {
  return (
    <div className="App">
      
      <Router>
      <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route path="/football" element={<Football />} />
      <Route path="/cricket" element={<Cricket />} />
      <Route path="/liveplay" element={<LivePlay />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/news" element={<News />} />
      <Route path="/promotions" element={<Promotions />} />
      <Route path="/login" element={<Login />} />
      <Route path="/termsconditions" element={<TermsConditions />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
