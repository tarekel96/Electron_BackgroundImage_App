import styles from './styles/loading.module.css';

const Loading = () => {
	console.log(process.env.PUBLIC_URL);

	return (
		<div className={styles['loadingContainer']}>
			<h2>Loading...</h2>
			<img src={`${process.env.PUBLIC_URL}/bounce-loading.gif`} alt="loading" />
		</div>
	);
};

export default Loading;
