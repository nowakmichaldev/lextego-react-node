import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { useQuizContext } from '../../context/QuizContext.tsx';
import { SideNav } from '../side-nav/SideNav.tsx';

import './Layout.scss';

type LayoutPropsType = {
	children: ReactNode;
};

export const Layout = ({ children }: LayoutPropsType) => {
	const { state } = useQuizContext();

	/**
	 * Get current route
	 * */
	const { pathname } = useLocation();

	return (
		<div className="layout-container">
			<div className="layout-header">
				<h1 className="layout-header-title">Lextego Quiz</h1>
				<div className="layout-header-buttons">
					{state.currentSlug && (
						<>
							<a href={`/q/${state.currentSlug}`}>
								Current Quiz
								<span>{state.currentTitle}</span>
							</a>

							<span className="layout-header-buttons-line" />
						</>
					)}
					<a href="/">Quizes</a>
				</div>
			</div>
			<div className="layout-content">
				{pathname !== '/' && (
					<div className="layout-content-left">
						<SideNav />
					</div>
				)}
				<div className={`layout-content-right ${pathname === '/' && 'center-content'}`}>{children}</div>
			</div>
		</div>
	);
};
