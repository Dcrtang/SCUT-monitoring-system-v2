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
      model: {
        fileId: string;
        viewToken: string;
      };

      members: {
        id: string;
        index: string;
        name: string;
        position: string;
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
      name:string;
      file: string;
    }[];

    progress: {
      id: string;
      name: string;
      model: {
        fileId: string;
        viewToken: string;
      };
    }[];

    quality: {
      id: string;
      name:string;
      elevation: {
        name: string;
        file: string;
      };

      cableForce: {
        name: string;
        file: string;
      }
    }[];

    sensor: {
      name: string;
      file: string;
    };
  }[]
}
