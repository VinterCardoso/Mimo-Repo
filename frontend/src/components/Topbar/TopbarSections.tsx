import { Box } from "@mui/material";
import { Link } from "react-router-dom";

type Section = {
    name: string;
    url: string;
}

function TopbarSections() {
    const sections: Section[] = [
        { name: 'cachorro', url: '/dog-items' },
        { name: 'gato', url: '/cat-items' },
        { name: 'pássaro', url: '/bird-items' },
        { name: 'peixe', url: '/fish-items' },
        { name: 'outros pets', url: '/other-pets' },
        { name: 'outlet até 90% off', url: '/outlet' },
        { name: 'mimo healthcare', url: '/mimo-healthcare' },
        { name: 'clube de fidelidade', url: '/loyalty-club' },
        { name: 'mais', url: '/more' }
    ];

    return (
        <Box sx={{display: 'flex', gap: '20px', alignItems: 'center', backgroundColor: 'white', borderRadius: '8px', padding: '10px 20px'}}>
            {sections.map(section => (
                <Link
                    key={section.name}
                    to={section.url}
                    style={{
                        marginRight: '20px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: 'black',
                        textTransform: 'uppercase',
                        textDecoration: 'none' // Remove o sublinhado padrão do link
                    }}
                >
                    {section.name}
                </Link>
            ))}
        </Box>
    )
}

export { TopbarSections };