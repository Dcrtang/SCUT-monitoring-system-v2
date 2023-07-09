export interface Config {
  title: string;
  intro: {
    text: string;
    img: string;

    members: {
      id: string;
      name: string;
      cert: string;
      title: string;
    }[];

    unitData: {
      id: string;
      type: string;
      area: string;
      // 抗弯惯性矩
      moment: string;
    }[];
    bridgeImg: string;
  };

  progress: {
    id: string;
    name: string;
    text: string;
    img: string;
  }[];

  report: {
    id: string;
    name: string;
    description: string;

    length: {
      id: string;
      name: string;
      lengthNum: string;
      factLeft: string;
      factMid: string;
      factRight: string;
      theoryLeft: string;
      theoryMid: string;
      theoryRight: string;
      errorLeft: string;
      errorMid: string;
      errorRight: string;
    }[];

    width: {
      id: string;
      name: string;
      widthNum: string;
      factLeft: string;
      factMid: string;
      factRight: string;
      theoryLeft: string;
      theoryMid: string;
      theoryRight: string;
      errorLeft: string;
      errorMid: string;
      errorRight: string;
    }[];

    lengthImg: string;
    widthImg: string;

    hengImg: string;
    zongImg: string;
  }[];

  monitingData: {
    id: string;
    name: string;
    data: {
      id: string;
      name: string;
      dataImg: string;
      modelImg: string;
    }[]
  }[];

  instructions: {
    id: string;
    img: string;
  }[];

  quality: {
    id: string;
    name: string;
    img1: string;
    img2: string;
  }[];
}
