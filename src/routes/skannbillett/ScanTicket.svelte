<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Html5Qrcode } from 'html5-qrcode';

	let scannerElement: HTMLDivElement;
	let html5QrCode: Html5Qrcode | null = null;
	let scannedData: string = '';
	let isScanning: boolean = false;
	let error: string = '';
	let verificationResult: { success: boolean; message: string } | null = null;

	const onScanSuccess = async (decodedText: string, decodedResult: any) => {
		console.log('QR Code scanned:', decodedText);
		scannedData = decodedText;

		// Send to server
		const formData = new FormData();
		formData.append('scannedData', decodedText);

		const response = await fetch('?/verifyTicket', {
			method: 'POST',
			body: formData
		});

		const result = await response.json();
		verificationResult = result.data;

		// Pause scanning for 3 seconds after successful scan
		if (html5QrCode && isScanning) {
			html5QrCode.pause(true);
			setTimeout(() => {
				if (html5QrCode && isScanning) {
					html5QrCode.resume();
					verificationResult = null;
				}
			}, 3000);
		}
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

	{#if verificationResult}
		{#if verificationResult.success}
			<div class="success">
				<h2>✅ {verificationResult.message}</h2>
			</div>
		{:else}
			<div class="error">
				<h2>❌ {verificationResult.message}</h2>
			</div>
		{/if}
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

	.error {
		margin-top: 1rem;
		padding: 1rem;
		background-color: #fee;
		border: 1px solid #fcc;
		border-radius: 0.5rem;
		color: #c00;
		width: 100%;
	}

	.success {
		margin-top: 1rem;
		padding: 1.5rem;
		background-color: #efe;
		border: 2px solid #4caf50;
		border-radius: 0.5rem;
		width: 100%;
		text-align: center;
	}

	.success h2 {
		margin: 0;
		font-size: 1.5rem;
		color: #2e7d32;
	}

	.error h2 {
		margin: 0;
		font-size: 1.2rem;
	}
</style>