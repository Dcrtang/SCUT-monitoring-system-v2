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
    };

    detail: {
      situation: string;
      model: string;

      members: {
        id: string;
        index: string;
        name: string;
        position: string;
        contactInfo: string;
      }[];

      beamData: {
        id: string;
        index: string;
        long: string;
        width: string;
        smallMile: string;
        bigMile: string;
      }[];

      cableData: {
        id: string;
        index: string;
        elasticity: string;
        vertical: string;
        length: string;
        force: string;
      }[];
    };

    instructions: {
      id: string;
      name:string;
      file: string;
    }[];

    progress: {
      id: string;
      name: string;
      model: string;
    }[];

    quality: {
      id: string;
      name: string;
      elevation: {
        name: string;
        file: string;
      };

      cableForce: {
        name: string;
        file: string;
      };
    }[];

    sensor: {
      name: string;
      file: string;
    };
  }[];
}

export const defaultConfig: Config = {
  title: '桥梁监控数据平台管理系统',
  programs: [
    {
      id: 'D960AF9C-5261-B66E-87A6-9926F7ADCFCF',

      intro: {
        name: '占位文本',
        type: '占位文本',
        status: '占位文本',
        unit: '占位文本',
        inCharge: '占位文本',
        bridgeImg: '占位文本',
      },

      detail: {
        situation: '占位文本',
        model: '占位文本',

        members: [
          {
            id: '89716C45-5746-3386-DC89-BB0E00479619',
            index: '占位文本',
            name: '占位文本',
            position: '占位文本',
            contactInfo: '占位文本',
          },
        ],

        beamData: [
          {
            id: '90D5D563-6ABD-713A-2D72-4E61D0F5E281',
            index: '占位文本',
            long: '占位文本',
            width: '占位文本',
            smallMile: '占位文本',
            bigMile: '占位文本',
          },
        ],

        cableData: [
          {
            id: '096568BF-85A1-9BE2-823F-66B2F4F83DB2',
            index: '占位文本',
            elasticity: '占位文本',
            vertical: '占位文本',
            length: '占位文本',
            force: '占位文本',
          },
        ],
      },

      instructions: [
        {
          id: '2517F526-F393-4BDA-B87E-D631E0CC8B27',
          name: '占位文本',
          file: '占位文本',
        },
      ],

      progress: [
        {
          id: 'A68B5F56-B53B-AD53-E5C2-11911CB9F7C6',
          name: '占位文本',
          model: '占位文本',
        },
      ],

      quality: [
        {
          id: 'F38CF419-A24F-48D3-858D-12940B56621F',
          name: '',
          elevation: {
            name: '占位文本',
            file: '占位文本',
          },

          cableForce: {
            name: '占位文本',
            file: '占位文本',
          },
        },
      ],

      sensor: {
        name: '占位文本',
        file: '占位文本',
      },
    },
  ],
};
