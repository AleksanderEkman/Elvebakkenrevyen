<script lang="ts">
</script>

<footer aria-label="Footer Informasjon">
	<div class="content">
		<div class="footer-col">
			<p id="header">© 2025 Elvebakkenrevyen</p>
			<p id="credit">
				Designet og utviklet av <a href="mailto:aleksanderekman@elvebakkenrevyen.no"
					>Aleksander Ekman</a
				>
			</p>
		</div>
		<div class="footer-col">
			<p id="header">Adresse</p>
			<ul>
				<li>
					<a
						href="https://www.google.com/maps/place/Vestre+Elvebakke+3"
						target="_blank"
						rel="noopener noreferrer"
					>
						Vestre Elvebakke 3<br />
						0182 Oslo
					</a>
				</li>
			</ul>
		</div>
		<div class="footer-col">
			<p id="header">Billetter</p>
			<ul>
				<li><a href="https://bestill.albillett.no/nb/1574">Elvebakkenrevyen Albillett</a></li>
			</ul>
		</div>
		<div class="footer-col">
			<p id="header">Kontakt oss</p>
			<ul>
				<li><a href="mailto:sjefer@elvebakkenrevyen.no">sjefer@elvebakkenrevyen.no</a></li>
			</ul>
		</div>
	</div>
</footer>

<style>
	footer {
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		padding: 2.75em 0em;
		background: linear-gradient(135deg, #000000, #101010);
		box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.5);
		text-wrap: nowrap;
	}

	.content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
		max-width: 1200px;
		gap: 3em;
	}

	.footer-col {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center; /* Center text within columns */
		flex: 1; /* Allow columns to grow and shrink equally */
		padding: 0 0.5em;
	}

	#header {
		font-size: 1.2em;
		font-weight: bold;
		color: white;
		margin-bottom: 0.5em;
	}

	#credit {
		font-size: 1em;
		color: white;
		margin-top: 0.5em;
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	li {
		font-size: 1em;
		color: white;
		margin: 0.1em 0;
	}

	a {
		color: white;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	@media (max-width: 880px) {
		footer {
			flex-direction: column;
			align-items: center;
		}

		.content {
			flex-direction: column;
			align-items: center;
		}

		.footer-col {
			width: 100%;
			align-items: center;
			text-align: center;
			padding: 0.5em 0;
		}

		#credit,
		li {
			text-align: center;
		}
	}

	@media (max-width: 1030px) and (orientation: landscape) {
		#header {
			font-size: 0.9em;
		}

		#credit {
			font-size: 0.75em;
		}
		li {
			font-size: 0.8em;
		}
	}
	@media (max-width: 480px) {
		#header {
			font-size: 1.1em;
		}
		#credit,
		li {
			font-size: 0.8em;
		}
		footer {
			height: auto;
		}
		.content {
			gap: 2.2em;
		}
	}
</style>
