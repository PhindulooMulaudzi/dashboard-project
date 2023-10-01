import './App.css';
import AppFooter from './components/app-footer/app-footer.component';
import AppHeader from './components/app-header/app-header.component';
import PageContent from './components/page-content/page-content.component';
import SideMenu from './components/side-menu/side-menu.component';

function App () {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <PageContent />
      </div>
      <AppFooter />
    </div>
  );
}

export default App;
