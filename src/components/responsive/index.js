import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const widthToDp = num => {
  let givenWidth = typeof num === 'number' ? num : parseFloat(num);
  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};

const heightToDp = num => {
  let givenHeight = typeof num === 'number' ? num : parseFloat(num);
  return PixelRatio.roundToNearestPixel((height * givenHeight) / 100);
};

export {widthToDp, heightToDp};
