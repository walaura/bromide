import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { hsl, withLuminance } from 'helper/color';

import Tile from 'component/Tile/Tile';
import useToggle from 'hook/useToggle';
import styles from './ChangeList.module.css';

const ChangeList = ({ singular, plural, files, total, color }) => {
	const [toggleState, toggle] = useToggle();
	return (
		<div>
			<button
				className={styles.headerBtn}
				data-open={toggleState}
				onClick={() => {
					toggle();
				}}
			>
				<header className={styles.header}>
					<h3
						className={styles.counter}
						style={{ background: hsl(withLuminance(color, 1.1)) }}
					>
						<div
							className={styles.counterPerc}
							style={{
								background: hsl(withLuminance(color, 0.8)),
								width: `${(files.length / total) * 100}%`,
							}}
						/>
					</h3>
					<h2
						className={styles.head}
						style={{ color: hsl(withLuminance(color, 0.25)) }}
					>
						{[
							files.length,
							files.length === 1 ? 'thing' : 'things',
							files.length === 1 ? singular : plural,
						].join(' ')}
					</h2>
					<div className={styles.chevron}>
						<FontAwesomeIcon icon={faChevronDown} />
					</div>
				</header>
			</button>
			{toggleState && (
				<section className={styles.grid}>
					{files.map(({ srcset, index, name, diff }) => (
						<Tile
							key={index}
							href={['#', 'image', index].join('/')}
							{...{ name, diff }}
							{...srcset}
						/>
					))}
				</section>
			)}
		</div>
	);
};
ChangeList.defaultProps = {
	color: [0, 0, 0],
};
export default ChangeList;
