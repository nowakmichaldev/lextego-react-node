import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout/Layout.tsx';
import Quiz from './components/quiz/Quiz.tsx';
import { Quizes } from './components/quizes/Quizes.tsx';
import { QuizProvider } from './context/QuizContext.tsx';

const App = () => (
	<>
		<BrowserRouter>
			<QuizProvider>
				<Layout>
					<Routes>
						<Route path="/" element={<Quizes />} />
						<Route path="/q/:Quizeslug" element={<Quiz />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Layout>
			</QuizProvider>
		</BrowserRouter>
	</>
);

export default App;
