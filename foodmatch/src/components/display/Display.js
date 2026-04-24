import "./Display.css";

const Display = ({ currentRestaurant, likeButton, dislikeButton, error }) => {
	function capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	}

	const days = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday"
	];

	function formatTime(t) {
		const hour = parseInt(t.slice(0, 2), 10);
		const min = t.slice(2);
		const ampm = hour >= 12 ? "PM" : "AM";
		const formattedHour = hour % 12 || 12;
		return `${formattedHour}:${min} ${ampm}`;
	}

	return (
		<div id="results">
			{error ? (
				<div id="emptyState">
					{error}
				</div>
			) : currentRestaurant ? (
				<>
					<div id="topSection">
						<img
							src={currentRestaurant.image_url}
							alt={currentRestaurant.name}
							id="restaurantImg"
						/>

						<div id="basicInfo">
							<h1>{currentRestaurant.name}</h1>

							<p>
								<b>Address:</b>{" "}
								{currentRestaurant.location.address1},{" "}
								{currentRestaurant.location.city}
							</p>

							<p>
								<b>Phone:</b> {currentRestaurant.display_phone}
							</p>

							<p>
								<b>Open Now:</b>{" "}
								{capitalize(
									(!currentRestaurant.is_closed).toString()
								)}
							</p>

							<p>
								<b>Hours:</b>
							</p>

							<div id="hours">
								{(() => {
									const seen = new Set();

									return currentRestaurant.business_hours?.[0]?.open
										?.filter((d) => {
											if (seen.has(d.day)) return false;
											seen.add(d.day);
											return true;
										})
										.map((d) => (
											<p key={d.day}>
												{days[d.day]}:{" "}
												{formatTime(d.start)} -{" "}
												{formatTime(d.end)}
											</p>
										));
								})()}
							</div>
						</div>
					</div>

					<div id="bottomSection">
						<p>
							<b>Available Services:</b>{" "}
							{currentRestaurant.transactions?.join(", ") || "None"}
						</p>

						<p>
							<b>Rating:</b> {currentRestaurant.rating}
						</p>

						<p>
							<b>Review Count:</b>{" "}
							{currentRestaurant.review_count}
						</p>

						{currentRestaurant.menu_url && (
							<p>
								<a
									href={currentRestaurant.menu_url}
									target="_blank"
									rel="noreferrer"
								>
									Menu
								</a>
							</p>
						)}

						<p>
							<a
								href={currentRestaurant.url}
								target="_blank"
								rel="noreferrer"
							>
								Check out Yelp Reviews
							</a>
						</p>
					</div>

					{likeButton && dislikeButton && (
						<div id="buttons">
							<div className="buttonWrapper dislikeButton">
								{dislikeButton}
							</div>

							<div className="buttonWrapper likeButton">
								{likeButton}
							</div>
						</div>
					)}
				</>
			) : (
				<div id="emptyState">
					Search/Click for a restaurant to begin
				</div>
			)}
		</div>
	);
};

export default Display;