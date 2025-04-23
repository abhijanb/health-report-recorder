import React, { useEffect, useRef } from 'react';
import ApexTree from 'apextree';

const TreeChart = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const data = {
      id: 'Lucas_Alex',
      data: {
        name: 'Lucas Alex',
        imageURL: 'https://i.pravatar.cc/300?img=68',
      },
      options: {
        nodeBGColor: '#94ddff',
      },
      children: [
        {
          id: 'Alex_Lee',
          data: {
            name: 'Alex Lee',
            imageURL: 'https://i.pravatar.cc/300?img=69',
          },
          options: {
            nodeBGColor: '#ffc7c2',
          },
          children: [
            {
              id: 'Mia_Patel',
              data: {
                name: 'Mia Patel',
                imageURL: 'https://i.pravatar.cc/300?img=49',
              },
              options: {
                nodeBGColor: '#e3c2ff',
              },
            },
            {
              id: 'Ryan_Clark',
              data: {
                name: 'Ryan Clark',
                imageURL: 'https://i.pravatar.cc/300?img=13',
              },
              options: {
                nodeBGColor: '#e3c2ff',
              },
            },
            {
              id: 'Zoe_Wang',
              data: {
                name: 'Zoe Wang',
                imageURL: 'https://i.pravatar.cc/300?img=54',
              },
              options: {
                nodeBGColor: '#e3c2ff',
              },
            },
          ],
        },
        {
          id: 'Leo_Kim',
          data: {
            name: 'Leo Kim',
            imageURL: 'https://i.pravatar.cc/300?img=43',
          },
          options: {
            nodeBGColor: '#ffc7c2',
          },
          children: [
            {
              id: 'Ava_Jones',
              data: {
                name: 'Ava Jones',
                imageURL: 'https://i.pravatar.cc/300?img=51',
              },
              options: {
                nodeBGColor: '#d2edc5',
              },
            },
            {
              id: 'Maya_Gupta',
              data: {
                name: 'Maya Gupta',
                imageURL: 'https://i.pravatar.cc/300?img=45',
              },
              options: {
                nodeBGColor: '#d2edc5',
              },
            },
          ],
        },
        {
          id: 'Lily_Chen',
          data: {
            name: 'Lily Chen',
            imageURL: 'https://i.pravatar.cc/300?img=52',
          },
          options: {
            nodeBGColor: '#ffc7c2',
          },
          children: [
            {
              id: 'Jake_Scott',
              data: {
                name: 'Jake Scott',
                imageURL: 'https://i.pravatar.cc/300?img=65',
              },
              options: {
                nodeBGColor: '#e9f08f',
              },
            },
          ],
        },
        {
          id: 'Max_Ruiz',
          data: {
            name: 'Max Ruiz',
            imageURL: 'https://i.pravatar.cc/300?img=50',
          },
          options: {
            nodeBGColor: '#ffc7c2',
          },
        },
      ],
    };

    const options = {
      contentKey: 'data',
      width: 700,
      nodeWidth: 150,
      nodeHeight: 70,
      childrenSpacing: 70,
      siblingSpacing: 30,
      direction: 'right',
      nodeTemplate: (content) => {
        const href = `/${content.name.replace(/\s+/g, '_')}`;
        return `
          <div 
            style="
              display: flex;
              align-items: center;
              height: 100%;
              width: 100%;
              padding: 8px 12px;
              gap: 12px;
              background: linear-gradient(135deg, #ffffff, #f2f2f2);
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              cursor: pointer;
              transition: transform 0.2s ease-in-out;
            "
            onmouseover="this.style.transform='scale(1.03)'"
            onmouseout="this.style.transform='scale(1)'"
            onclick="window.location.href='${href}'"
          >
            <img 
              src="${content.imageURL}" 
              alt="${content.name}" 
              style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #ccc;" 
            />
            <div 
              style="
                font-weight: 600;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 14px;
                color: #333;
              "
            >
              ${content.name}
            </div>
          </div>
        `;
      },
      nodeStyle: 'box-shadow: -3px 6px 8px -5px rgba(0,0,0,0.31)',
      canvasStyle: 'border: 1px solid black; background: #f6f6f6;',
    };

    if (containerRef.current) {
      const tree = new ApexTree(containerRef.current, options);
      tree.render(data);
    }
  }, []);

  return <div ref={containerRef} className="bg-green-500"></div>;
};

export default TreeChart;
