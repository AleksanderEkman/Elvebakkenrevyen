<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Html5Qrcode } from 'html5-qrcode';

	let scannerElement: HTMLDivElement;
	let html5QrCode: Html5Qrcode | null = null;
	let scannedData: string = '';
	let isScanning: boolean = false;
	let error: string = '';
	let isValid: boolean | "used" | null = null;

	const onScanSuccess = async (decodedText: string, decodedResult: any) => {
		console.log('QR Code scanned:', decodedText);
		scannedData = decodedText;

		// Pause scanning IMMEDIATELY to prevent duplicate scans
		if (html5QrCode && isScanning) {
			html5QrCode.pause(true);
		}

		// Send to server
		const formData = new FormData();
		formData.append('scannedData', decodedText);

		try {
			const response = await fetch('?/verifyTicket', {
				method: 'POST',
				body: formData
			});

			const result = await response.json();

			// Parse the double-encoded data
			const data = typeof result.data === 'string' ? JSON.parse(result.data) : result.data;

			// The data is in array format: [map, "success", true/false/"used", "message"]
			if (Array.isArray(data)) {
				if (data[2] === "used") {
					isValid = "used";
				} else if (data[2] === true) {
					isValid = true;
				} else {
					isValid = false;
				}
			} else {
				if (data.success === "used") {
					isValid = "used";
				} else if (data.success === true) {
					isValid = true;
				} else {
					isValid = false;
				}
			}
		} catch (err) {
			isValid = false;
		}

		// Resume scanning after 3 seconds
		setTimeout(() => {
			if (html5QrCode && isScanning) {
				html5QrCode.resume();
				isValid = null;
			}
		}, 3000);
	};

	const onScanError = (errorMessage: string) => {

	};

	const startScanning = async () => {
		try {
			html5QrCode = new Html5Qrcode('qr-reader');

			const config = {
				fps: 10,
				qrbox: { width: 250, height: 250 },
				aspectRatio: 1.0
			};

			await html5QrCode.start(
				{ facingMode: 'environment' },
				config,
				onScanSuccess,
				onScanError
			);

			isScanning = true;
			error = '';
		} catch (err: any) {
			console.error('Error starting scanner:', err);
			error = `Failed to start camera: ${err.message}`;

			// Fallback: try any available camera
			try {
				if (html5QrCode) {
					await html5QrCode.start(
						{ facingMode: 'user' },
						{ fps: 10, qrbox: { width: 250, height: 250 } },
						onScanSuccess,
						onScanError
					);
					isScanning = true;
					error = 'Using front camera (back camera not available)';
				}
			} catch (fallbackErr: any) {
				error = `Camera access denied or not available: ${fallbackErr.message}`;
			}
		}
	};

	const stopScanning = async () => {
		if (html5QrCode && isScanning) {
			try {
				await html5QrCode.stop();
				isScanning = false;
			} catch (err) {
				console.error('Error stopping scanner:', err);
			}
		}
	};

	onMount(() => {
		startScanning();
	});

	onDestroy(() => {
		stopScanning();
	});
</script>

<div class="scanner-container">
	<div id="qr-reader" bind:this={scannerElement}></div>

	{#if error}
		<div class="error">
			<p>⚠️ {error}</p>
		</div>
	{/if}


	{#if isValid === true}
		<div class="success">
			<p>Gyldig billett</p>
		</div>
	{:else if isValid == "used"}
		<div class="error">
			<p>Billett allerede brukt</p>
		</div>
	{:else if isValid === false}
		<div class="error">
			<p>Ugyldig billett</p>
		</div>
	{/if}
</div>

<style>
	.scanner-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		padding: 1rem;
	}

	#qr-reader {
		width: 100%;
		border-radius: 0.5rem;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	/* Hide the "Scanner paused" message */
	:global(#qr-reader__scan_region img[alt="Info icon"]) {
		display: none !important;
	}

	:global(#qr-reader__scan_region div[style*="text-align: center"]) {
		display: none !important;
	}

	:global(#qr-reader__dashboard_section_csr) {
		display: none !important;
	}

	.success,
	.error {
		margin-top: 2rem;
		padding: 2rem;
		border-radius: 8px;
		text-align: center;
	}

	.success {
		background: green;
	}

	.error {
		background: red;
	}

</style>