const WavePattern = `<svg id="visual" viewBox="0 0 1920 1080" width="1920" height="1080" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M932 0L934.8 36C937.7 72 943.3 144 916.7 216C890 288 831 360 835.3 432C839.7 504 907.3 576 919 648C930.7 720 886.3 792 854 864C821.7 936 801.3 1008 791.2 1044L781 1080L0 1080L0 1044C0 1008 0 936 0 864C0 792 0 720 0 648C0 576 0 504 0 432C0 360 0 288 0 216C0 144 0 72 0 36L0 0Z" fill="#1fcb4f"></path><path d="M584 0L575 36C566 72 548 144 544 216C540 288 550 360 559.2 432C568.3 504 576.7 576 565.5 648C554.3 720 523.7 792 498.3 864C473 936 453 1008 443 1044L433 1080L0 1080L0 1044C0 1008 0 936 0 864C0 792 0 720 0 648C0 576 0 504 0 432C0 360 0 288 0 216C0 144 0 72 0 36L0 0Z" fill="#ffc01e"></path></svg>`;

export const waveStyles = {
  waveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '45%',
    height: '100%',
    overflow: 'hidden',
    display: { xs: 'none', md: 'block' }
  },
  wave: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(WavePattern)}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'left center',
    backgroundRepeat: 'no-repeat',
  }
};
