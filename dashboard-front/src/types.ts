export interface Config {
  title: string;

  programs: {
    id: string;

    intro: {
      name: string;
      type: string;
      status: string;
      unit: string;
      inCharge: string;
      bridgeImg: string;
    }

    detail: {
      situation: string;
      model: string;

      members: {
        id: string;
        index: string;
        name: string;
        postion: string;
        contactInfo: string;
      }[]

      beamData: {
        id: string;
        index: string;
        long: string;
        width: string;
        smallMile: string;
        bigMile: string;
      }[]

      cableData: {
        id: string;
        index: string;
        elasticity: string;
        vertical: string;
        length: string;
        force: string;
      }[]
    }

    instructions: {
      id: string;
      file: string;
    }[];

    progress: {
      id: string;
      name: string;
      model: string;
    }[];

    quality: {
      elevation: {
        id: string;
        name: string;
        file: string;
      }[];

      cableForce: {
        id: string;
        name: string;
        file: string;
      }[]
    };

    sensor: {
      name: string;
      file: string;
    };
  }[]
}
