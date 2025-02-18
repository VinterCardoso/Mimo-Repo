import { Box } from "@mui/material";

type Section = {
    name: string;
    url: string;
}

function TopbarSections() {
    const sections: Section[] = [
        { name: 'cachorro', url: '' },
        { name: 'gato', url: '' },
        { name: 'pássaro', url: '' },
        { name: 'peixe', url: '' },
        { name: 'outros pets', url: '' },
        { name: 'outlet até 90% off', url: '' },
        { name: 'mimo healthcare', url: '' },
        { name: 'clube de fidelidade', url: '' },
        { name: 'mais', url: '' }
    ];

    return (
        <Box sx={{display: 'flex', gap: '20px', alignItems: 'center', backgroundColor: 'white', borderRadius: '8px', padding: '10px 20px'}}>
            {sections.map(section => (
                <Box key={section.name} sx={{marginRight: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', color: 'black', textTransform: 'uppercase'}}>
                    {section.name}
                </Box>
            ))}
        </Box>
    )
}

export { TopbarSections };