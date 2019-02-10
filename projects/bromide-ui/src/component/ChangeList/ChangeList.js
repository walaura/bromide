import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { hsl, withLuminance } from 'helper/color';
import { ViewOptionsContext } from 'context/viewOptions';

import Tile from 'component/Tile/Tile';
import useToggle from 'hook/useToggle';
import styles from './ChangeList.module.css';

const ChangeList = ({ singular, plural, files, total, color }) => {
	const [toggleState, toggle] = useToggle();
	const { hasLargeImages, imageSize } = useContext(ViewOptionsContext);
	const size = 4 + 24 * imageSize;
	const gap = 0.5 + 3 * imageSize;

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
				<section
					className={styles.grid}
					style={{
						marginTop: `${gap / 3}em`,
						gridTemplateColumns: `repeat(auto-fill, minmax(${size}em, 1fr))`,
						gridGap: `${gap}em`,
					}}
				>
					{files.map(({ srcset, index, name, difference }) => (
						<Tile
							key={index}
							tiny={size < 10}
							href={['#', 'image', index].join('/')}
							{...{ name, difference, srcset, hasLargeImages }}
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
