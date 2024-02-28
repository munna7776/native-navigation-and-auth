import {AppwriteProvider} from './appwrite/provider';
import Router from './routes';

export default function App() {
  return (
    <AppwriteProvider>
      <Router />
    </AppwriteProvider>
  );
}
